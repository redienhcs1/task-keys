import { useState, KeyboardEvent } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>(props.initialData);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');

    const sortedItems = [...items].sort((a, b) => {
        return props.sorting === 'ASC' ? a.id - b.id : b.id - a.id;
    });

    const handleStartEdit = (item: IItem) => {
        setEditingId(item.id);
        setEditValue(item.name);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, id: number) => {
        if (e.key === 'Enter') {
            setItems((prev) =>
                prev.map((item) => (item.id === id ? { ...item, name: editValue } : item))
            );
            setEditingId(null);
        } else if (e.key === 'Escape') {
            setEditingId(null);
        }
    };

    return (
        <div>
            {sortedItems.map((item) => (
                <div key={item.id}>
                    {editingId === item.id ? (
                        <input
                            autoFocus
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, item.id)}
                        />
                    ) : (
                        <span onClick={() => handleStartEdit(item)}>{item.name}</span>
                    )}
                </div>
            ))}
        </div>
    );
}