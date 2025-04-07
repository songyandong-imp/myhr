using com.sap.myhr as myhr from '../db/data-model';

service MenuService {

    entity FixMenu as projection on myhr.FixMenu;
    entity Menu as projection on myhr.Menu;
    entity JdBase as projection on myhr.JdBase;


}
