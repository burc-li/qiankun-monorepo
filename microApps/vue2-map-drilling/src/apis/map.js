import axios from 'axios'

// const prefix = 'http://localhost:8002'
const prefix = `http://localhost:${process.env.VUE_APP_POST}`

// 获取GeoJSON数据
export const getGeoJson = (type, name) => {
  // 获取中国的geojson数据
  if (type === 'china') return axios.get(`${prefix}/geoJsonColl/china.json`)

  // 获取省、直辖市、自治区的geojson数据
  if (type === 'province') return axios.get(`${prefix}/geoJsonColl/province/${name}.json`)

  // 获取区、县的geojson数据
  return axios.get(`${prefix}/geoJsonColl/city/${name}.json`)
}

// 获取地图数据
export const getMapData = (type) => {
  // 获取中国数据
  if (type === 'china') return axios.get(`${prefix}/mock/china.json`)

  // 获取省、直辖市、自治区的数据（山东省）
  if (type === 'province') return axios.get(`${prefix}/mock/province.json`)

  // 获取区、县的数据（济南市）
  return axios.get(`${prefix}/mock/city.json`)
}
