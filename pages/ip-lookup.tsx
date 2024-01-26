import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import { Pane, TextInput, Button, Table, Card, Group } from 'evergreen-ui';
import { Row, Col } from '@/components/ui/grid';

declare var L: any;

const IPLookup = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [ipDetails, setIpDetails] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [localIp, setLocalIp] = useState('');
  let map: any = null;
  useEffect(() => {
    // fetch local ip
    fetch('https://s1-hono.w3cub.com/api/ip')
      .then((res) => res.json())
      .then((data) => {
        setLocalIp(data.ip);
        setIpAddress(data.ip);
        setIpDetails(data);
        markUserLocation(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useLayoutEffect(() => {
    map = L.map('map', {
      attributionControl: false
    }).setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; W3cub.com',
      maxZoom: 18
    }).addTo(map);
  }, []);

  const markUserLocation = useCallback((data: any) => {
    if (!data) return;
    const city = data.city;
    const latitude = data.latitude;
    const longitude = data.longitude;
    L.marker([latitude, longitude]).addTo(map).bindPopup(city).openPopup();
    map.setView([latitude, longitude], 10);
  }, []);


  const fetchIPDetails = useCallback(async (ip: string) => {
    if (!ip) return;
    try {
      setLoading(true);
      const ipurl = 'https://s1-hono.w3cub.com/api/ip?ip=' + ip;
      const response = await fetch(ipurl);
      const data = await response.json();
      setIpDetails(data);
      markUserLocation(data);
    } catch (error) {
      console.error('Error fetching IP details:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    setIpAddress(e.target.value);
  };

  const handleLookup = () => {
    fetchIPDetails(ipAddress);
  };
  return (
    <Pane>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin="anonymous"  />
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossOrigin="anonymous" ></script>
      <Card>
        <Pane>
          <h4>
            <i className="fa fa-cogs"></i> IP Address Lookup
            <strong style={{ color: 'red' }}>（Local IP Address: {localIp}）</strong>
          </h4>
        </Pane>
        <Pane>
          <Row gutter={20} >
            <Col span={8}>
              <Group flex="1 0 auto" width="100%" marginBottom="20px">
                <TextInput
                  flex="max-content"
                  height={50}
                  placeholder="Enter IP Address"
                  value={ipAddress}
                  onChange={handleInputChange}
                />
                <Button height={50} appearance="primary" onClick={handleLookup} isLoading={loading}>
                  Lookup
                </Button>
              </Group>
              {ipDetails && (
                <Table>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width="100px" >Lookup IP</Table.Cell>
                      <Table.Cell>
                        <b>{ipDetails.ip}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="100px">Country / Region</Table.Cell>
                      <Table.Cell>
                        <b>{ipDetails.country}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="100px">Region</Table.Cell>
                      <Table.Cell>
                        <b>{ipDetails.region}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="100px">City</Table.Cell>
                      <Table.Cell>
                        <b>{ipDetails.city}</b>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell width="100px" >ISP</Table.Cell>
                      <Table.Cell>
                        <b>{ipDetails.org}</b>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              )}
            </Col>
            <Col span={16}>
              <Pane height="400px" id="map">
              </Pane>
            </Col>
          </Row>
        </Pane>
      </Card>
    </Pane>
  );
};

export default IPLookup;

