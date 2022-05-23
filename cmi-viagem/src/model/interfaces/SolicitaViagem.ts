export interface ISolicitacaoViagem {
  categoryID: string;
  costCenterID: number;
  employeeID: number;
  from: {
    latitude: number;
    longitude: number;
  };
  phoneNumber?: string;
  to: {
    latitude: number;
    longitude: number;
  };
}
