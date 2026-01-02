import { useRouter } from 'next/navigation';
import Tabs from '@/components/ui/Tabs';

interface CrewDetailSectionsTabsProps {
  sections: string[];
}

export default function CrewDetailSectionsTabs({
  sections,
}: CrewDetailSectionsTabsProps) {
  const router = useRouter();

  return (
    <Tabs defaultValue={sections[0]} className="tablet:top-15 sticky top-14">
      <Tabs.List>
        {sections.map((section) => (
          <Tabs.Trigger
            key={section}
            value={section}
            onClick={() => router.push(`#${section}`)}
            className="bg-gray-900"
          >
            {section}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs>
  );
}
