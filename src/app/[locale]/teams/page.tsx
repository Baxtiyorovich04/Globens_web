import { TeamsSection } from '@/components/Teams';
import styles from './teams.module.scss';
import { redirect } from 'next/navigation';
import { isUserLoggedIn } from '@/utilities/authServer';
import { getLocale } from 'next-intl/server';

export default async function TeamsPage() {
  const isLoggedIn = await isUserLoggedIn();
  const locale = await getLocale();

  if (!isLoggedIn) {
    redirect(`/${locale}/login`);
  }

  return (
    <div className={styles.teamsPage}>
      <TeamsSection />
    </div>
  );
}
