import { useLoaderData } from "react-router-dom";
import { createContact, getContacts } from "../contacts";
import { Box } from "@mui/material";
import CorpRootLayout from "../global/templates/corpRootLayout";

export default function Root() {
  const { contacts } = useLoaderData();

  if (process.env.NODE_ENV === "production") {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  }

  console.log({ contacts: process.env.NODE_ENV });
  return (
    <Box>
      <CorpRootLayout />
    </Box>
  );
}

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export async function action() {
  const contacts = await createContact();
  return { contacts };
}
