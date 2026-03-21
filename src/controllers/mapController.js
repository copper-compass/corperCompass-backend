import Area from '../models/Area.js';
import Lodge from '../models/Lodge.js';

export const getMapMarkers = async (req, res, next) => {
  try {
    const areas = await Area.find({ 'location.coordinates': { $exists: true, $ne: [] } })
      .select('name state location rentRange');

    const lodges = await Lodge.find({ 
      'location.coordinates': { $exists: true, $ne: [] },
      isDeleted: false
    })
      .populate('area', 'name state')
      .select('name area location price');

    const markers = [
      ...areas.map(area => ({
        id: area._id,
        type: 'area',
        name: area.name,
        state: area.state,
        rentRange: area.rentRange,
        lat: area.location.coordinates[1],
        lng: area.location.coordinates[0],
      })),
      ...lodges.map(lodge => ({
        id: lodge._id,
        type: 'lodge',
        name: lodge.name,
        area: lodge.area?.name,
        state: lodge.area?.state,
        price: lodge.price,
        lat: lodge.location.coordinates[1],
        lng: lodge.location.coordinates[0],
      })),
    ];
    res.json(markers);
  } catch (error) {
    next(error);
  }
};

export const getHeatmapData = async (req, res, next) => {
  try {
    const lodges = await Lodge.find({ 
      'location.coordinates': { $exists: true, $ne: [] },
      isDeleted: false
    })
      .select('location price');

    const heatmapPoints = lodges.map(lodge => ({
      lat: lodge.location.coordinates[1],
      lng: lodge.location.coordinates[0],
      weight: lodge.price ? lodge.price / 1000 : 50,
    }));

    res.json(heatmapPoints);
  } catch (error) {
    next(error);
  }
};