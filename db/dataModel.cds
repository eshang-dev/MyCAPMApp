namespace fleetdb.db;

using {managed} from '@sap/cds/common';

entity Vehicleheader : managed {
    key vannum        : String(32);
        vehicletype   : String(32);
        fueltype      : String(32);
        vehicledetail : Composition of one VehicleDetail
                            on vehicledetail.det = $self;
}

entity VehicleDetail : managed {
    key det           : Association to Vehicleheader;
        enginecap     : String(32);
        registration  : String(32);
        motcert       : String(50);
        lastmotmleage : String(32);
        motduedate    : Date;
        taxrefNo      : String(32);
        taxduedate    : Date;

}

entity Insurance : managed {
    key insurcert     : String(50);
    key vannum        : String(32);
        insurancedate : Date;
        status        : String(32);
}

entity Driver : managed {
    key driverlic    : String(32);
    key vannum       : String(32);
        drivername   : String(32);
        driverlicexp : Date;
        driverlicpts : String(32);
        lastupdate   : Date;
        startdate    : Date;
        enddate      : Date;
}

entity Mot : managed {
    key vannum       : String(32);
        lastupdate   : Date;
        status       : String(32);
        ApproverName : String(32);
}

entity Tax : managed {
    key vannum     : String(32);
        lastupdate : Date;
        TaxAmount  : String(32);
        TaxType    : String(32);
}

entity Expiry : managed {
    key vannum        : String(32);
        insurcert     : String(50);
        insurancedate : Date;
        mailid        : String(32);
}

entity MailGet : managed {
    key vannum : String(32);
}
