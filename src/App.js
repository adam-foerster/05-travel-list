import React, { useState } from "react";
import Logo from "./Components/Logo";
import Form from "./Components/Form";
import PackingList from "./Components/PackingList";
import Stats from "./Components/Stats";

export default function App() {
	const [items, setItems] = useState([]);

	function handleAddItems(item) {
		setItems((items) => [...items, item]);
	}

	function handleDeleteItem(id) {
		setItems((items) => items.filter((item) => item.id !== id));
	}

	function handleToggleItem(id) {
		setItems((items) =>
			items.map((item) =>
				item.id === id ? { ...item, packed: !item.packed } : item
			)
		);
	}

	function handleLoadFile() {
		const data = localStorage.getItem("packing-list");
		if (data) {
			setItems(JSON.parse(data));
			console.log("Packing list loaded from local storage.");
		}
	}

	function handleSaveFile() {
		localStorage.setItem("packing-list", JSON.stringify(items));
		console.log("Packing list saved to local storage.");
	}

	function handleClearFile() {
		localStorage.removeItem("packing-list");
		const confirmed = window.confirm(
			"Are you sure you want to clear the list?"
		);

		if (confirmed) {
			setItems([]);
		}
		console.log("Packing list cleared from local storage.");
	}

	return (
		<div>
			<Logo onLoadFile={handleLoadFile} />
			<Form onAddItems={handleAddItems} onSaveFile={handleSaveFile} />
			<PackingList
				items={items}
				onDeleteItem={handleDeleteItem}
				onToggleItem={handleToggleItem}
				onClearFile={handleClearFile}
			/>
			<Stats items={items} />
		</div>
	);
}
