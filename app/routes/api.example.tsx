import { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

// Fake data for demonstration
const fakeData = [
  { id: 1, name: "Example Item 1" },
  { id: 2, name: "Example Item 2" },
];

// Handler for GET requests (fetch all items)
export const loader: LoaderFunction = async () => {
  return json({ items: fakeData });
};

// Handler for POST requests (add a new item)
export const action: ActionFunction = async ({ request }) => {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name) {
      return json({ error: "Name is required" }, { status: 400 });
    }

    const newItem = { id: fakeData.length + 1, name };
    fakeData.push(newItem);

    return json({ message: "Item added successfully", item: newItem }, { status: 201 });
  } catch (error) {
    return json({ error: "Invalid request" }, { status: 400 });
  }
};
