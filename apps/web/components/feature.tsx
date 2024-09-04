interface FeatureProps {
  icon: React.ReactNode;
  smallTitle: string;
  largeTitle: string;
  description: string;
}
export const Feature: React.FC<FeatureProps> = ({
  icon,
  smallTitle,
  largeTitle,
  description,
}) => {
  return (
    <li className="border flex flex-col p-2 gap-3 w-full md:max-w-[48ch] max-w-[40ch]">
      <header className="flex items-center p-2 gap-3 text-xs font-bold">
        {icon}
        <h3>{smallTitle}</h3>
      </header>
      <h4 className="text-xl font-bold">{largeTitle}</h4>
      <p className="text-xs">{description}</p>
    </li>
  );
};
