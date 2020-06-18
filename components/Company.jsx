import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Company = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
  text-align: center;
`

export default ({ name }) => (
  <Company key={name}>
    <NavLink to={`/podcasts/${name}`}>{`${name}`}</NavLink>
  </Company>
)
