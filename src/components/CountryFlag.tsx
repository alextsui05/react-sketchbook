import { getFlagUrl } from '@/flags';

export default function CountryFlag({
  isoCode,
  name,
}: {
  isoCode: string;
  name: string;
}) {
  return (
    <div className="w-100 p-2">
      <h3 className="text-center text-4xl pb-2">{name}</h3>
      <img src={getFlagUrl(isoCode)} alt={isoCode} className="w-full" />
    </div>
  );
}
