import { PromptCard } from "./PromptCard";

interface PromptsGridProps {
  prompts: Record<string, string>;
  onEdit: (business: string) => void;
  onCall: (business: string) => void;
}

export function PromptsGrid({ prompts, onEdit, onCall }: PromptsGridProps) {
  const keys = Object.keys(prompts);

  if (keys.length === 0)
    return (
      <p className="text-center text-muted-foreground mt-10">
        No prompts available at the moment.
      </p>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {keys.map((business) => (
        <PromptCard
          key={business}
          business={business}
          prompt={prompts[business]}
          onEdit={onEdit}
          onCall={onCall}
        />
      ))}
    </div>
  );
}
