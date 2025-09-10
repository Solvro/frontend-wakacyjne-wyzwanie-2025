// I think it should be workerize-loader, not workerize
import makeFilterCitiesWorker from 'workerize-loader!./filter-cities'

const {getItems} = makeFilterCitiesWorker()

export {getItems}

/*
eslint
  import/no-webpack-loader-syntax: 0,
*/
