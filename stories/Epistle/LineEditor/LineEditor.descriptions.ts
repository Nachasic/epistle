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

### 4. Deleting atom
When atom is in **editing mode** user can delete the atom by emptying it's value and then unfocusing the input field.

- Input field is empty and unfocused;
- Delete callback is invoked.

### 5. Exiting viewing mode
When atom is in **editing mode** user can perform following actions to return back to the **viewing mode**:

- Unfocus the input field;
- Click anywhere outside of the input field;
- Type space.

If the atom had been selected before **editing mode** it should remain selected.
`

export const atomSequence = `
# Definitions and disambiguations

# User scenarios
### 1. Viewing the line
User should be able to view individual words of the line along with "+" button at the end.

### 2. Appending atoms
User should be able to append an empty editable atom by clicking the "+" button.

### 3. Editing atoms
User should be able to edit existing atoms by double-clicking them.

### 4. Deleting atoms
User should be able to delete the atoms by editing out their contents and then pressing backspace or clicking/focusing outside of them. The very first atom can not be deleted

### 5. Injecting atoms
User should be able to inject new atoms in the middle of the line by typing space in exiting atoms whilst editing them.

### 6. Selecting/deselecting atoms
User should be able to select/deselect atoms by clicking on them. Edited atoms should remain selected if they were before editing.
`

export const lineDirector = `

`
