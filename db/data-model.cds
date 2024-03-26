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
