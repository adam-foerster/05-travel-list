import React, { useState } from "react";
import Item from "./Item";
// import { download } from "./fileMaintenance";

export default function PackingList({
	items,
	onDeleteItem,
	onToggleItem,
	onClearFile,
}) {
	const [sortBy, setSortBy] = useState("input");

	let sortedItems;

	if (sortBy === "input") sortedItems = items;

	if (sortBy === "description")
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));

	if (sortBy === "packed")
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));

	return (
		<div className="list">
			<ul>
				{" "}
				{sortedItems.map((item) => (
					<Item
						item={item}
						onDeleteItem={onDeleteItem}
						key={item.id}
						onToggleItem={onToggleItem}
					/>
				))}{" "}
			</ul>

			<div className="actions">
				<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value="input">Sort by Input Order</option>
					<option value="description">Sort Alphabetically</option>
					<option value="packed">Sort by Packed Status</option>
				</select>
				<button
					onClick={() => {
						onClearFile();
					}}>
					Clear List
				</button>
			</div>
		</div>
	);
}
