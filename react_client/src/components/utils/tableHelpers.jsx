import { Button, Row, Col } from 'react-bootstrap';
import{ EyeFill, PencilFill, TrashFill } from 'react-bootstrap-icons';

const TABLE_ICON_PX_SIZE = 18;

export function initTableHeaders(headers, className_th) {
    return headers.map((header, colId) => 
        <th key={'th_' + colId} className={className_th}>{header}</th>
    );
}

export function initTableRows(totalRows, headers, className_td, className_tr) {
    return Array.apply(null, Array(totalRows)).map(( _ , rowId) => {
        const tdJSX = headers.map(( _ , colId) => <td key={'td_row' + rowId + '_col' + colId} className={className_td}></td>);
        const trJSX = <tr key={'row'+rowId} className={className_tr}>{tdJSX}</tr>
        return (trJSX);
    });
}

export function populateRowsFromMock(rowsJSX, mockData) {
    return rowsJSX.map(( row , rowId) => {
        if (mockData[rowId] === undefined)
            return row;

        return (<tr key={'row'+rowId} className='table-row'>
            <td key={'td_row' + rowId + '_col' + 0} className='table-data'>{rowId}</td>
            <td key={'td_row' + rowId + '_col' + 1} className='table-data'>{mockData[rowId].name}</td>
            <td key={'td_row' + rowId + '_col' + 2} className='table-data'>{mockData[rowId].number}</td>
            <td key={'td_row' + rowId + '_col' + 3} className='table-data'>{mockData[rowId].description}</td>
            <td key={'td_row' + rowId + '_col' + 4} className='table-data'>{mockData[rowId].minifigures}</td>
            <td key={'td_row' + rowId + '_col' + 5} className='table-data'>{mockData[rowId].numPieces}</td>
            <td key={'td_row' + rowId + '_col' + 6} className='table-data'>{mockData[rowId].price}</td>
            <td key={'td_row' + rowId + '_col' + 7} className='table-data'>
                <Row>
                    <Col>
                        <Button 
                            variant="light"
                            className='blockheadsImageButton rounded-circle'
                            style = {{color: 'black'}}
                        >
                            <EyeFill size = {TABLE_ICON_PX_SIZE}/>
                        </Button>
                    </Col>

                    <Col>
                        <Button 
                            variant="light"
                            className='blockheadsImageButton rounded-circle'
                            style = {{color: 'black'}}
                        >
                            <PencilFill size = {TABLE_ICON_PX_SIZE}/>
                        </Button>
                    </Col>

                    <Col>
                        <Button 
                            variant="light"
                            className='blockheadsImageButton rounded-circle'
                            style = {{color: 'black'}}
                        >
                            <TrashFill size = {TABLE_ICON_PX_SIZE}/>
                        </Button>
                    </Col>
                </Row>
            </td>
        </tr>)
    })
}