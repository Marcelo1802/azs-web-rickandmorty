import { Redirect } from 'expo-router';

/**
 * Rota inicial que redireciona para a splash screen
 */
export default function Index() {
  return <Redirect href="/splash" />;
}