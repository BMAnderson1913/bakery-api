import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  border-radius: 10px;
  background-color: #d4e0f5;
  font-size: 20px;
  margin: 40px auto;
  outline: none;
  padding: 5px 8px;
  width: 300px;
`

export default ({ term, setter }) => (
  <Input type="text" name="search" value={term} onChange={event => setter(event.target.value)} />
)
