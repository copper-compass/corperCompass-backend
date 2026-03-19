import Area from '../models/Area.js';
import Lodge from '../models/Lodge.js';

export const getMapMarkers = async (req, res, next) => {
  try {
    const areas = await Area.find({ 'location.coordinates': { $exists: true, $ne: [] } })
      .select('name state location rentRange');
    const lodges = await Lodge.find({ 'location.coordinates': { $exists: true, $ne: [] } })
      .populate('area', 'name state')
      .select('name area location priceRange');

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
        priceRange: lodge.priceRange,
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
    const lodges = await Lodge.find({ 'location.coordinates': { $exists: true, $ne: [] } })
      .populate('area')
      .select('location priceRange area');
    const heatmapPoints = lodges.map(lodge => {
      const avgRent = lodge.priceRange?.min && lodge.priceRange?.max
        ? (lodge.priceRange.min + lodge.priceRange.max) / 2
        : 50000;
      return {
        lat: lodge.location.coordinates[1],
        lng: lodge.location.coordinates[0],
        weight: avgRent / 1000,
      };
    });
    res.json(heatmapPoints);
  } catch (error) {
    next(error);
  }
};
