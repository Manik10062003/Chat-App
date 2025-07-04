import React from 'react'

const Settingspage = () => {
  return (
  <select
  className="select select-bordered max-w-xs"
  onChange={(e) =>
    document.documentElement.setAttribute("data-theme", e.target.value)
  }
>
  <option disabled selected>Choose Theme</option>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="retro">Retro</option>
  <option value="valentine">Valentine</option>
  <option value="cupcake">Cupcake</option>
</select>

  )
}

export default Settingspage