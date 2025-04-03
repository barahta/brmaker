import React, { createContext, useState } from 'react';
import {ToastContainer} from "react-toastify";

export const DataContext = createContext('')

export const DataProvider = ({ children }) => {
        const getMonthName = (monthIndex) => {
        const monthNames = [
            "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
            "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
        ];
        return monthNames[monthIndex];
    }
    const optionsYear = [
        { value: '0', label: '2022' },
        { value: '1', label: '2023' },
        { value: '2', label: '2024' }
    ]
    const optionsMonth = [
        { value: '0', label: 'январь' },
        { value: '1', label: 'февраль' },
        { value: '2', label: 'март' },
        { value: '3', label: 'апрель' },
        { value: '4', label: 'май' },
        { value: '5', label: 'июнь' },
        { value: '6', label: 'июль' },
        { value: '7', label: 'август' },
        { value: '8', label: 'сентябрь' },
        { value: '9', label: 'октябрь' },
        { value: '10', label: 'ноябрь' },
        { value: '11', label: 'декабрь' }
    ]
    const icons = {
        'dir':'fa-folder',
        'doc':'fa-file-word',
        'xls':'fa-file-excel',
        'docx':'fa-file-word',
        'wps':'fa-file-lines',
        'xlsx':'fa-file-excel',
        'csv':'fa-file-excel',
        'pdf':'fa-file-pdf',
        'rar':'fa-file-zipper',
        'zip':'fa-file-zipper',
        '7z':'fa-file-zipper',
        'gzip':'fa-file-zipper',
        'jpg':'fa-file-image',
        'png':'fa-file-image',
        'bmp':'fa-file-image',
        'gif':'fa-file-image',
        'tif':'fa-file-image',
        'txt':'fa-file-lines',
        'vsdx':'fa-file-lines',
        'vsd':'fa-file-lines',
        'gsf':'fa-file-lines',
        'xml':'fa-file-excel',
        'fb2':'fa-file-lines'
    }
    return (
        <DataContext.Provider value={{
            getMonthName,
            optionsMonth,
            optionsYear,
            icons
        }}>
            {children}
            <ToastContainer />
        </DataContext.Provider>
    );
};