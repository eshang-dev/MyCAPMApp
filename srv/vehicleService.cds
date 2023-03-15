using {fleetdb.db as vehicledb} from '../db/dataModel';

service NewServices {
    entity Vehicleheader as projection on vehicledb.Vehicleheader;
    entity VehicleDetail as projection on vehicledb.VehicleDetail;
    entity Insurance     as projection on vehicledb.Insurance;
    entity Driver        as projection on vehicledb.Driver;
    entity Mot           as projection on vehicledb.Mot;
    entity Tax           as projection on vehicledb.Tax;
    entity Expiry        as projection on vehicledb.Expiry;
    entity MailGet       as projection on vehicledb.MailGet;
}
