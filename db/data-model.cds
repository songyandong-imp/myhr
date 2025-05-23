namespace com.sap.myhr;

entity FixMenu {
    key id           : Integer;
        description  : String(50);
        titleI18nKey : String(50);
        target       : String(50);
        icon         : String(50);
        expanded     : Boolean;
        items        : Composition of many FixMenuItems
                           on items.id = $self;
}

entity FixMenuItems {
    key id           : Association to FixMenu;
    key pos          : Integer;
        description  : String(50);
        titleI18nKey : String(50);
        target       : String(50);
}

entity Menu {
    key id           : Integer;
        description  : String(50);
        hierarchyLevel:Integer;
        drillState:String(50);
        titleI18nKey : String(50);
        target       : String(50);
        icon         : String(50);
        pid          : Integer;
}
entity JdBase {
    key id           : Integer;
        position  : String(50);
        dept:String(50);
        desc:String(50);
        user : String(50);
  
}
