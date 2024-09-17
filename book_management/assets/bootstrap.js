import { startStimulusApp } from '@symfony/stimulus-bridge';

// Registers Stimulus controllers from controllers.json and in the controllers/ directory
// export const app = startStimulusApp(require.context(
//     '@symfony/stimulus-bundle/lazy-controller-loader!./controllers',
//     true,
//     /\.[jt]sx?$/
// ));
const app =startStimulusApp();