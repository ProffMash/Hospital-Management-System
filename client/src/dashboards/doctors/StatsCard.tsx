interface StatsCardProps {
  title: string;
  count: number;
  subtitle: string;
  bgColor?: string; // bgColor is optional
}

const StatsCard = ({ title, count, subtitle, bgColor }: StatsCardProps) => {
  return (
    <div className={`shadow-lg rounded-lg p-6 ${bgColor || 'bg-white'}`}>
      <h3 className="text-black-500 text-sm">{title}</h3>
      <h2 className="text-2xl font-bold">{count}</h2>
      <p className="text-black-400 text-sm">{subtitle}</p>
    </div>
  );
};

export default StatsCard;
