import { useState, useEffect } from 'react'
import * as C from './App.styles'
import { Item } from './types/item'
import { Category } from './types/category'
import { categories } from './data/categories'
import { items } from './data/items'
import { getCurrentMonth, filterListByMonth } from './helpers/dateFilter'
import { TableArea } from './components/TableArea'
import { InfoArea } from './components/InfoArea'

const App = () => {
  const [list, setList] = useState(items)
  const [filteredList, setFilteredList] = useState<Item[]>([])
  const [currentMonth, setCurrenteMonth] = useState(getCurrentMonth())
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  useEffect(()=>{
    setFilteredList(filterListByMonth(list, currentMonth))
  }, [list, currentMonth])

  useEffect(()=>{
    let incomeCount = 0
    let expenseCount = 0

    for(let i in filteredList){
      categories[filteredList[i].category].expense ? expenseCount += filteredList[i].value : incomeCount += filteredList[i].value
    }

    setIncome(incomeCount)
    setExpense(expenseCount)
     
  }, [filteredList])

  const handleMonthChange = (newMonth: string) => {
    setCurrenteMonth(newMonth)
  }

  return ( 
    <C.Container>
      <C.Header>
        <C.HeaderText>
          Sistema Financeiro
        </C.HeaderText>
      </C.Header>
      <C.Body>
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
          />

        {/* Inserção */}

        <TableArea list={filteredList}/>
      </C.Body>
    </C.Container>
  )
}

export default App