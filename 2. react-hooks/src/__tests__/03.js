import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
//Checks final, as the 03-extra-1 is mutually exclusive with 03
import App from '../final/03'

test('App works', async () => {
  render(<App />)
  await userEvent.type(screen.getByRole('textbox', {name: /name/i}), 'mulan')
  await userEvent.type(screen.getByRole('textbox', {name: /animal/i}), 'dragon')
  expect(
    screen.getByText('Hey mulan, your favorite animal is: dragon!'),
  ).toBeInTheDocument()
})
