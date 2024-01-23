import { useEffect, useState } from 'react';
import { useWindowSize } from 'usehooks-ts';
import { Card, Pane } from 'evergreen-ui';
import Ellipsis from '@/components/ui/Ellipsis';

interface InformationItem {
  label: string;
  value: string;
}

interface Section {
  name: string;
  information: InformationItem[];
}


const InformationCard = ({ name, information }: Section) => {
  return (
    <Card key={name}
      paddingX={24}
      paddingY={20}
      borderRadius={4}
      backgroundColor="#ffffff"
      border="1px solid #efeff5"
      flex="0 1 600px"
    >
      <h2>{name}</h2>
      <Pane
        width="100%"
        display="grid"
        gridTemplateColumns="repeat(2, minmax(0px, 1fr))"
        gap={12}
      >
        {information.map(({ label, value }) => (
          <Pane key={label}
            paddingX={16}
            paddingY={14}
            borderRadius={4}
            backgroundColor="#aaaaaa11"
            gridColumn="span 1 / span 1"
          >
            <Pane
              fontSize={14}
              opacity={0.8}
              lineHeight={1}
              marginBottom={5}

            >{label}</Pane>
            <Pane
              fontSize={20}
              fontWeight={400}
            >
              <Ellipsis tooltip maxCharacters={25}>{value || 'unknown'}</Ellipsis>
            </Pane>
          </Pane>
        ))}
      </Pane>
    </Card>
  );
};

const uaParser = (ua: string) => {
  const regex = {
    browser: /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
    os: /(iphone|ipad|ipod|android|blackberry|playbook|windows ce|webos|symbian|windows phone|windows nt|macintosh|linux|Mac OS X)\s([0-9\._]+)/i,
    engine: /(webkit|gecko|trident(?=\/))\/?\s*(\d+)/i
  };
  const match = (regex) => {
    return ua.match(regex);
  };
  const browserMatch = match(regex.browser) || [];
  const osMatch = match(regex.os) || [];
  const engineMatch = match(regex.engine) || [];

  return {
    browser: {
      name: browserMatch[1] || '',
      version: browserMatch[2] || '',
    },
    os: {
      name: osMatch[1] || '',
      version: osMatch[2] || '',
    },
    engine: {
      name: engineMatch[1] || '',
      version: engineMatch[2] || '',
    },
  };
}


const DeviceInfomation = () => {
  const { width, height } = useWindowSize();
  const [Sections, setSection] = useState<Section[]>([]);
  useEffect(() => {
    const ua = uaParser(navigator.userAgent)
    const arr: Section[] = [
      {
        name: 'Screen',
        information: [
          {
            label: 'Screen size',
            value: `${window.screen.availWidth} x ${window.screen.availHeight}`,
          },
          {
            label: 'Orientation',
            value: window.screen.orientation.type,
          },
          {
            label: 'Orientation angle',
            value: `${window.screen.orientation.angle}°`,
          },
          {
            label: 'Color depth',
            value: `${window.screen.colorDepth} bits`,
          },
          {
            label: 'Pixel ratio',
            value: `${window.devicePixelRatio} dppx`,
          },
          {
            label: 'Window size',
            value: `${width} x ${height}`,
          },
        ],
      },
      {
        name: 'Device',
        information: [
          {
            label: 'Browser vendor',
            value: navigator.vendor,
          },
          {
            label: 'Languages',
            value: navigator.languages.join(', '),
          },
          {
            label: 'Platform',
            value: navigator.platform,
          },
          {
            label: 'User agent',
            value: navigator.userAgent,
          },
        ],
      },
      {
        name: "User Agent Details",
        information: [
          {
            label: 'Browser name',
            value: ua.browser.name,
          },
          {
            label: 'Browser version',
            value: ua.browser.version,
          },
          {
            label: 'OS name',
            value: ua.os.name,
          },
          {
            label: 'OS version',
            value: ua.os.version,
          },
          {
            label: 'Engine name',
            value: ua.engine.name,
          },
          {
            label: 'Engine version',
            value: ua.engine.version,
          },
        ]
      }
    ];
    setSection(arr);
  }, [width]);

  return (
    <Pane
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="flex-start"
      flexWrap="wrap"
      gap={16}

    >
      {Sections.map((section) => (
        <InformationCard key={section.name} {...section} />
      ))}
    </Pane>
  );
};

export default DeviceInfomation;
