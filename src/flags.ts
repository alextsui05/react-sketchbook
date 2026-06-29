const flags = import.meta.glob('./assets/svg/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

const flagUrlByCode: Record<string, string> = Object.fromEntries(
  Object.entries(flags).map(([key, value]) => {
    const code = key.match(/([^/]+)\.svg$/)![1];
    console.log(code);
    return [code, value as string];
  }),
);

export const getFlagUrl = (isoCode: string) => flagUrlByCode[isoCode];
