import React, { Component } from 'react'

export class Loader extends Component {
  render() {
    return (
      <div className='text-center'>

<div className="spinner-border text-danger " role="status">
  <span className="sr-only"></span>
</div>
      </div>
    )
  }
}

export default Loader