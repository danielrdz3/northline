export const michiganCities = `Adrian
Albion
Algonac
Allegan
Allen Park
Alma
Alpena
Ann Arbor
Au Gres
Auburn
Auburn Hills
Bad Axe
Bangor
Battle Creek
Bay City
Beaverton
Belding
Belleville
Benton Harbor
Berkley
Bessemer
Big Rapids
Birmingham
Bloomfield Hills
Boyne City
Bridgman
Brighton
Bronson
Brown City
Buchanan
Burton
Cadillac
Caro
Carson City
Caseville
Caspian
Cedar Springs
Center Line
Charlevoix
Charlotte
Cheboygan
Chelsea
Clare
Clawson
Clio
Coldwater
Coleman
Coloma
Coopersville
Corunna
Croswell
Crystal Falls
Davison
Dearborn
Dearborn Heights
Detroit
DeWitt
Dexter
Douglas
Dowagiac
Durand
East Grand Rapids
East Jordan
East Lansing
East Tawas
Eastpointe
Eaton Rapids
Ecorse
Escanaba
Essexville
Evart
Farmington
Farmington Hills
Fennville
Fenton
Ferndale
Ferrysburg
Flat Rock
Flint
Flushing
Frankenmuth
Frankfort
Fraser
Fremont
Gaastra
Galesburg
Garden City
Gaylord
Gibraltar
Gladstone
Gladwin
Gobles
Grand Blanc
Grand Haven
Grand Ledge
Grand Rapids
Grandville
Grant
Grayling
Greenville
Grosse Pointe
Grosse Pointe Farms
Grosse Pointe Park
Grosse Pointe Woods
Hamtramck
Hancock
Harbor Beach
Harbor Springs
Harper Woods
Harrison
Harrisville
Hart
Hartford
Hastings
Hazel Park
Highland Park
Hillsdale
Holland
Houghton
Howell
Hudson
Hudsonville
Huntington Woods
Imlay City
Inkster
Ionia
Iron Mountain
Iron River
Ironwood
Ishpeming
Ithaca
Jackson
Jonesville
Kalamazoo
Keego Harbor
Kentwood
Kingsford
Laingsburg
Lake Angelus
Lake City
Lansing
Lapeer
Lathrup Village
Leslie
Lincoln Park
Linden
Litchfield
Livonia
Lowell
Ludington
Luna Pier
Mackinac Island
Madison Heights
Manistee
Manistique
Manton
Marine City
Marlette
Marquette
Marshall
Marysville
Mason
McBain
Melvindale
Memphis
Menominee
Midland
Milan
Monroe
Montague
Montrose
Morenci
Mount Clemens
Mount Morris
Mount Pleasant
Munising
Muskegon
Muskegon Heights
Negaunee
New Baltimore
New Buffalo
Newaygo
Niles
North Muskegon
Northville
Norton Shores
Norway
Novi
Oak Park
Olivet
Omer
Onaway
Orchard Lake Village
Otsego
Ovid
Owosso
Parchment
Perry
Petersburg
Petoskey
Pinconning
Plainwell
Pleasant Ridge
Plymouth
Pontiac
Port Huron
Portage
Portland
Potterville
Reading
Reed City
Richmond
River Rouge
Riverview
Rochester
Rochester Hills
Rockford
Rockwood
Rogers City
Romulus
Roosevelt Park
Rose City
Roseville
Royal Oak
Saginaw
Saline
Sandusky
Saugatuck
Sault Ste. Marie
Scottville
South Haven
South Lyon
Southfield
Southgate
Springfield
St. Clair
St. Clair Shores
St. Ignace
St. Johns
St. Joseph
St. Louis
Standish
Stanton
Stephenson
Sterling Heights
Sturgis
Swartz Creek
Sylvan Lake
Tawas City
Taylor
Tecumseh
Three Rivers
Traverse City
Trenton
Troy
Utica
Vassar
Village of Clarkston
Village of Grosse Pointe Shores
Wakefield
Walker
Walled Lake
Warren
Watervliet
Wayland
Wayne
West Branch
Westland
White Cloud
Whitehall
Whittemore
Williamston
Wixom
Woodhaven
Wyandotte
Wyoming
Yale
Ypsilanti
Zeeland
Zilwaukee`.split("\n");

export const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const cityBySlug = new Map(michiganCities.map((city) => [slugify(city), city]));
