import * as Contacts from "expo-contacts";

/**
 * Consulta paginada de contatos.
 * pageOffset é a quantidade de registros que já foram ignorados.
 * name é enviado para a consulta nativa, evitando trazer milhares de contatos
 * para a memória apenas para filtrar em JavaScript.
 */
export async function buscarContatos({ pageSize = 30, pageOffset = 0, name = "" }) {
  const permission = await Contacts.requestPermissionsAsync();

  if (permission.status !== "granted") {
    throw new Error("Permissão de contatos não concedida.");
  }

  const result = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
    pageSize,
    pageOffset,
    name: name.trim(),
    sort: Contacts.SortTypes.FirstName
  });

  return {
    data: result.data ?? [],
    hasNextPage: result.hasNextPage ?? ((result.data ?? []).length === pageSize)
  };
}