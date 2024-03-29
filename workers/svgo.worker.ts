import { optimize } from "svgo";

const _self: any = self;

interface Data {
  payload: Payload;
  id: string;
}

interface Payload {
  value: string;
  settings: any;
}

_self.onmessage = ({ data: { id, payload } }: { data: Data }) => {
  delete payload.settings.optimizeSvg;

  const plugins = Object.keys(payload.settings).filter(
    key => payload.settings[key]
  ) as any[];

  try {
    const result = optimize(payload.value, {
      plugins: plugins
    });
    _self.postMessage({
      id,
      payload: result.data
    });
  } catch (e) {
    if (process.env.dev) {
      console.error(e);
    }
    _self.postMessage({
      id,
      err: e.message
    });
  }
};
