import observable = require("data/observable");
import proxy = require("ui/core/proxy");
import definition = require("./grid-view");
import dependencyObservable = require("ui/core/dependency-observable");
import builder = require("ui/builder");
import view = require("ui/core/view");

var ITEMSCHANGED = "_itemsChanged";
var GRIDVIEW = "GridView";
var CHANGE = "change";

export module knownTemplates
{
    export var itemTemplate = "itemTemplate";
}

function onItemsPropertyChanged(data: dependencyObservable.PropertyChangeData)
{
    var gridView = <definition.GridView>data.object;
    var itemsChanged = gridView[ITEMSCHANGED];

    if (data.oldValue instanceof observable.Observable)
    {
        (<observable.Observable>data.oldValue).off(CHANGE, itemsChanged);
    }

    if (data.newValue instanceof observable.Observable)
    {
        (<observable.Observable>data.newValue).on(CHANGE, itemsChanged);
    }

    gridView.refresh();
}

function onItemTemplatePropertyChanged(data: dependencyObservable.PropertyChangeData)
{
    var gridView = <definition.GridView>data.object;
    gridView.refresh();
}

function onColWidthPropertyChanged(data: dependencyObservable.PropertyChangeData)
{
    var gridView = <definition.GridView>data.object;
    gridView.refresh();
}

function onRowHeightPropertyChanged(data: dependencyObservable.PropertyChangeData)
{
    var gridView = <definition.GridView>data.object;
    gridView.refresh();
}

function onSpacingPropertyChanged(data: dependencyObservable.PropertyChangeData)
{
    var gridView = <definition.GridView>data.object;
    gridView.refresh();
}

function getExports(instance: view.View): any
{
    var parent = instance.parent;

    while (parent && (<any>parent).exports === undefined)
    {
        parent = parent.parent;
    }

    return parent ? (<any>parent).exports : undefined;
}

export class GridView extends view.View implements definition.GridView
{
    public static itemLoadingEvent = "itemLoading";
    public static itemTapEvent = "itemTap";
    public static loadMoreItemsEvent = "loadMoreItems";

    public static itemsProperty = new dependencyObservable.Property(
        "items"
        , GRIDVIEW
        , new proxy.PropertyMetadata(
            undefined,
            dependencyObservable.PropertyMetadataSettings.AffectsLayout,
            onItemsPropertyChanged
            )
        );

    public static itemTemplateProperty = new dependencyObservable.Property(
        "itemTemplate"
        , GRIDVIEW
        , new proxy.PropertyMetadata(
            undefined,
            dependencyObservable.PropertyMetadataSettings.AffectsLayout,
            onItemTemplatePropertyChanged
            )
        );

    public static colWidthProperty = new dependencyObservable.Property(
        "colWidth"
        , GRIDVIEW
        , new proxy.PropertyMetadata(
            100,
            dependencyObservable.PropertyMetadataSettings.AffectsLayout,
            onColWidthPropertyChanged
            )
        );

    public static rowHeightProperty = new dependencyObservable.Property(
        "rowHeight"
        , GRIDVIEW
        , new proxy.PropertyMetadata(
            100,
            dependencyObservable.PropertyMetadataSettings.AffectsLayout,
            onRowHeightPropertyChanged
            )
        );

    public static verticalSpacingProperty = new dependencyObservable.Property(
        "verticalSpacing"
        , GRIDVIEW
        , new proxy.PropertyMetadata(
            10,
            dependencyObservable.PropertyMetadataSettings.AffectsLayout,
            onSpacingPropertyChanged
            )
        );

    public static horizontalSpacingProperty = new dependencyObservable.Property(
        "horizontalSpacing"
        , GRIDVIEW
        , new proxy.PropertyMetadata(
            10,
            dependencyObservable.PropertyMetadataSettings.AffectsLayout,
            onSpacingPropertyChanged
            )
        );

    private _itemsChanged: (args: observable.EventData) => void;
    public _setCurrentMeasureSpecs: (widthSpec: number, heightSpec: number) => boolean;

    constructor()
    {
        super();
        this._itemsChanged = (args: observable.EventData) => { this.refresh(); };
    }

    get items(): any
    {
        return this._getValue(GridView.itemsProperty);
    }
    set items(value: any)
    {
        this._setValue(GridView.itemsProperty, value);
    }

    get itemTemplate(): string
    {
        return this._getValue(GridView.itemTemplateProperty);
    }
    set itemTemplate(value: string)
    {
        this._setValue(GridView.itemTemplateProperty, value);
    }

    get colWidth(): number
    {
        return this._getValue(GridView.colWidthProperty);
    }
    set colWidth(value: number)
    {
        this._setValue(GridView.colWidthProperty, value);
    }

    get rowHeight(): number
    {
        return this._getValue(GridView.rowHeightProperty);
    }
    set rowHeight(value: number)
    {
        this._setValue(GridView.rowHeightProperty, value);
    }

    get verticalSpacing(): number
    {
        return this._getValue(GridView.verticalSpacingProperty);
    }
    set verticalSpacing(value: number)
    {
        this._setValue(GridView.verticalSpacingProperty, value);
    }

    get horizontalSpacing(): number
    {
        return this._getValue(GridView.horizontalSpacingProperty);
    }
    set horizontalSpacing(value: number)
    {
        this._setValue(GridView.horizontalSpacingProperty, value);
    }

    public refresh()
    {
        //
    }

    public _getItemTemplateContent(): view.View
    {
        var v;

        if (this.itemTemplate && this.items)
        {
            v = builder.parse(this.itemTemplate, getExports(this));
        }

        return v;
    }

    public _prepareItem(item: view.View, index: number)
    {
        if (item)
        {
            item.bindingContext = this._getDataItem(index);
        }
    }

    private _getDataItem(index: number): any
    {
        return this.items.getItem ? this.items.getItem(index) : this.items[index];
    }
}