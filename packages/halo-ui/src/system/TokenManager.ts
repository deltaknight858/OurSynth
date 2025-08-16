// TokenManager: Centralized token registry and accessor
import { color } from '../tokens/color';
import { radius } from '../tokens/radius';
import { shadow } from '../tokens/shadow';
import { spacing } from '../tokens/spacing';
import { neon } from '../tokens/theme';
import { zIndex } from '../tokens/zindex';

const tokenRegistry = {
  neon,
  spacing,
  color,
  zIndex,
  radius,
  shadow,
};

export function getToken(path: string) {
  return path.split('.').reduce((acc, key) => (acc ? (acc as any)[key] : undefined), tokenRegistry);
}

// Usage:
// getToken('color.neon')
// getToken('spacing.md')
