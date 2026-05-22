import { Config } from '@remotion/cli/config';

Config.setEntryPoint('./src/index.ts');
Config.setVideoImageFormat('jpeg');
Config.setCrf(18);
Config.setCodec('h264');
Config.setPixelFormat('yuv420p');
Config.setScale(1);
Config.setChromiumOpenGlRenderer('angle');
Config.setDelayRenderTimeoutInMilliseconds(15000);
