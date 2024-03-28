import React, {useState} from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,styled } from '@mui/material';
import {HeadCells,headCells} from '../../utils/data-utils'
import { width } from '@mui/system'
import './InventoryTable.scss'


const StyledTableRow = styled(TableRow)({
    '&:last-child td': {
      borderBottom: 'none',
    },
     borderBottom: '1px solid #30363db3',
  });

  const RedHeaderTableCell = styled(TableCell)({
    backgroundColor: 'red',
    color: 'yellow',
  });

const dummyData = [
    { cell1: 'Row 1 Cell 1', cell2: 'Row 1 Cell 2', cell3: 'Row 1 Cell 3', cell4: 'Row 1 Cell 4', cell5: 'Row 1 Cell 5', cell6: 'Row 1 Cell 6' },
    { cell1: 'Row 2 Cell 1', cell2: 'Row 2 Cell 2', cell3: 'Row 2 Cell 3', cell4: 'Row 2 Cell 4', cell5: 'Row 2 Cell 5', cell6: 'Row 2 Cell 6' },
    // Add more rows as needed
  ];
const InventoryTable:React.FC = ()=> {
    const [columnHeader, setColumnHeader] = useState<HeadCells[]>(headCells)
  return (
  <>
      <TableContainer component={Paper}  className='table-container' sx={{ border: '1px solid #30363db3', backgroundColor:'black' }} >
      <Table sx={{ borderCollapse: 'collapse' }}>
        <TableHead >
          <TableRow sx={{ border: '1px solid #30363db3 !important' }}>
            {columnHeader.map((header, index) => (
              <TableCell sx={{ color: 'var(--text-primary-color)', border: 'none' }} key={index}><span className='table-container-cell'>{header.label}</span></TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyData.map((row, rowIndex) => (
            <StyledTableRow key={rowIndex}>
              {columnHeader.map((_, cellIndex) => (
                <TableCell sx={{ color: 'var(--text-primary-color)',border: 'none'  }} key={cellIndex}>{"hii"}</TableCell>
              ))}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </>
  )
}

export default InventoryTable
