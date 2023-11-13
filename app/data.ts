export interface ContactRecord {
  id: string;
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
}

const contacts: ContactRecord[] = [
  {
    id: "1",
    first: "Your",
    last: "Name",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "your_handle",
    notes: "Some notes",
    favorite: true,
  },
];

export const getContacts: (
  q: string | null
) => Promise<ContactRecord[]> = async (q) => {
  if (!q || q === "") return contacts;
  const lowerq = q.toLowerCase();
  return contacts.filter((contact) =>
    `${contact.first} ${contact.last}`.toLowerCase().includes(lowerq)
  );
};

export const getContact: (id: string) => Promise<ContactRecord | null> = async (
  cid
) => {
  return contacts.find(({ id }) => id === cid) || null;
};

export const createEmptyContact: () => Promise<ContactRecord> = async () => {
  const last = contacts.at(-1);
  const empty = {
    id: last ? `${parseInt(last.id) + 1}` : "0",
    first: "",
    last: "",
    avatar: "",
    twitter: "",
    notes: "",
    favorite: false,
  };
  contacts.push(empty);
  return empty;
};

export const updateContact: (
  id: string,
  data: ContactRecord
) => Promise<ContactRecord | null> = async (cid, data) => {
  let result = null;
  contacts.forEach((contact, index) => {
    if (contact.id === cid) {
      contacts[index] = {
        ...contact,
        ...data,
      };

      result = contacts[index];
    }
  });

  return result;
};
