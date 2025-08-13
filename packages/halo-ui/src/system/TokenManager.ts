// TokenManager: Centralized token registry and accessor
import { neon } from '../tokens/theme';
import { spacing } from '../tokens/spacing';
import { color } from '../tokens/color';
import { zIndex } from '../tokens/zindex';
import { radius } from '../tokens/radius';
import { shadow } from '../tokens/shadow';

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
