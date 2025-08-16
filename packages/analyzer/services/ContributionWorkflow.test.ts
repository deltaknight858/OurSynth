import * as fs from 'fs';
import * as path from 'path';

import { ContributionWorkflow } from './ContributionWorkflow';

describe('ContributionWorkflow', () => {
  it('should create a Storybook file for a new component', () => {
    const tempComponentPath = path.join(__dirname, 'TempComponent.tsx');
    fs.writeFileSync(
      tempComponentPath,
      'export default function TempComponent() { return <div />; }',
    );
    const componentName = 'TempComponent';
    // Mock UI components and stories directories
    const uiComponentsDir = path.resolve('packages/ui/src/components');
    const storybookDir = path.resolve('packages/ui/src/stories');
    if (!fs.existsSync(uiComponentsDir)) fs.mkdirSync(uiComponentsDir, { recursive: true });
    if (!fs.existsSync(storybookDir)) fs.mkdirSync(storybookDir, { recursive: true });
    // Only test Storybook file creation
    ContributionWorkflow.contributeComponent = jest.fn();
    ContributionWorkflow.contributeComponent(tempComponentPath, componentName);
    const storyPath = path.join(storybookDir, `${componentName}.stories.tsx`);
    expect(fs.existsSync(storyPath)).toBe(true);
    fs.unlinkSync(tempComponentPath);
    fs.unlinkSync(storyPath);
  });
});
