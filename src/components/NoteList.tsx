import { SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React from "react";

type Note = {
  id: string;
  createDate: string;
  title: string;
  body: string;
};

const useNotes = () => ({
  notes: [
    {
      id: "1",
      createDate: "2024-10-02T15:48:48.407Z",
      title: "Note one",
      body: "-Remember to do that one important thing\n-Remember to do that one important thing\n-Remember to do that one important thing\n-Remember to do that one important thing\n-Remember to do that one important thing\n",
    },
    {
      id: "2",
      createDate: "2024-10-02T15:48:48.407Z",
      title: "Note two",
      body: "Note 2",
    },
    {
      id: "3",
      createDate: "2024-10-02T15:48:48.407Z",
      title: "Note three",
      body: "Note 3",
    },
    {
      id: "4",
      createDate: "2024-10-02T15:48:48.407Z",
      title: "Note four",
      body: "Note 4",
    },
    {
      id: "5",
      createDate: "2024-10-02T15:48:48.407Z",
      title: "Note five",
      body: "Note 5",
    },
    {
      id: "6",
      createDate: "2024-10-02T15:48:48.407Z",
      title: "Note six",
      body: "Note 6",
    },
    {
      id: "7",
      createDate: "2024-10-02T15:48:48.407Z",
      title: "Note seven",
      body: "Note 7",
    },
    {
      id: "8",
      createDate: "2024-10-02T15:48:48.407Z",
      title: "Note eight",
      body: "Note 8",
    },
    {
      id: "9",
      createDate: "2024-10-02T15:48:48.407Z",
      title: "Note nine",
      body: "Note 9",
    },
  ] as Note[],
});

export const NoteList: React.FC = () => {
  const notes = useNotes();
  return (
    <SimpleGrid minChildWidth="450px" spacing={4}>
      {notes.notes.map((note) => (
        <Stack
          key={note.id}
          direction="column"
          border="1px"
          borderColor="gray.200"
          shadow="lg"
          p={4}
          borderRadius={4}
          height="250px"
        >
          <Text>{note.title}</Text>
          <Text size="sm">
            {note.body.split("\n").map((line, index) => (
              // It is okay to use index as a key as we never reorder this list
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Text>
        </Stack>
      ))}
    </SimpleGrid>
  );
};
