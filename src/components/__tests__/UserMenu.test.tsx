import { render, screen } from '@testing-library/react';
import UserMenu from '../UserMenu';
jest.mock('../../i18n', () => ({}));
jest.mock('@/integrations/supabase/client', () => ({ supabase: {} }));

test('renders avatar button', () => {
  render(<UserMenu fullName="Test User" avatarUrl="" />);
  expect(screen.getByRole('button')).toBeInTheDocument();
});
