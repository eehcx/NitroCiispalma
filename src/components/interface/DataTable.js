import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { DataTable } from 'react-native-paper';

export default DataTableComponent = ({ data, headers }) => {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, data.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <>
            <DataTable>
                <DataTable.Header>
                    {headers.map((header) => (
                        <DataTable.Title
                            key={header.key}
                            numeric={header.numeric}
                        >
                            {header.title}
                        </DataTable.Title>
                    ))}
                </DataTable.Header>

                {data.slice(from, to).map((item) => (
                    <DataTable.Row key={item.key}>
                        {Object.values(item).map((value, index) => (
                            <DataTable.Cell key={index} numeric={headers[index].numeric}>
                                {value}
                            </DataTable.Cell>
                        ))}
                    </DataTable.Row>
                ))}
            </DataTable>
        </>
    );
};