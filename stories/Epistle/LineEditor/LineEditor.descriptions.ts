export const singleAtom = `
# Definitions and disambiguations
- **Atom** — a single directed word. A sequence of atoms form a dialogue line;
- **Viewing mode** — a mode in which user can view and select the atom;
- **Editing mode** — a mode in which user can edit atom's body.

# User scenarios
### 1. Selecting/deselecting atom
When atom is in **viewing mode** user can \`click\` on it to select/deselect it.

- Selected atom should render with yellow background;
- Deselected atom should render with transparent background.

### 2. Setting editing mode
When atom is in **viewing mode** user can \`double click\` on it to enter editing mode.

- User can see that the atom turned into an editable input field;
- User's browser is automatically focused on the input field.

### 3. Editing atom's body text
When atom is in **editing mode** user can modify the word via the input field.

- Input field is editable;
- Current word appears as input's current value;
- User can type non-space characters and see the value changing.

### 4. Exiting viewing mode
When atom is in **editing mode** user can perform following actions to return back to the **viewing mode**:

- Unfocus the input field;
- Click anywhere outside of the input field;
- Type space.

If the atom had been selected before **editing mode** it should remain selected.
`
