import React, { useState } from 'react';
import './ComboBoxSort.css';


const ComboBoxSort = ({SortById, SortByComplited, RandomSort, SortByTitle}) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleComboBoxChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);

        switch (value) {
            case 'SortById':
                SortById();
                break;
            case 'SortByTitle':
                SortByTitle();
                break;
            case 'SortByComplited':
                SortByComplited();
                break;
            case 'RandomSort':
                RandomSort();
            break;
            default:
                SortById();
                break;
        }
    };

    return (
        <div>
            <select className="ComboBox" value={selectedValue} onChange={handleComboBoxChange}>
                <option value="SortById">Sort Tasks By Id</option>
                <option value="SortByTitle">Sort Tasks By Title</option>
                <option value="SortByComplited">Sort Tasks By Completed</option>
                <option value="RandomSort">Sort Tasks Randomly</option>
            </select>
        </div>
    );
};

export default ComboBoxSort;