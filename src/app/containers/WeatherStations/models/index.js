import { generateImmutable } from 'base/shared/ModelHelper';
import  WeatherStationsModel  from './WeatherStationsModel';
import  ForecastModel from './ForecastModel';
import  WeatherStationDetailsModel  from './WeatherStationDetailsModel';
import  WeatherStationsCollection  from './WeatherStationsCollection';

function setInitialState(initialState) {
  return initialState.WeatherStations = new WeatherStationsCollection({
    data: generateImmutable( initialState.WeatherStations.data, WeatherStationsModel ),
    forecast: generateImmutable( initialState.WeatherStations.forecast, ForecastModel ),
    weatherStationDetails: generateImmutable( initialState.WeatherStations.weatherStationDetails, WeatherStationDetailsModel )
  });
}

export { WeatherStationsModel, WeatherStationsCollection, ForecastModel, WeatherStationDetailsModel, setInitialState };
