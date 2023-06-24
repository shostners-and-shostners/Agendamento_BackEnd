SELECT
 tick.idTickets,
 tick.idTicketMoviDesk as 'Nº do Ticket', 
 tick.empresa as 'Empresa', 
 tick.codFilial as 'Filial', 
 tick.codForn as 'Fornecedor', 
 tick.numeroOS as 'Número da OS',
 tick.dtSolict as 'Data de Criação do PC',
 tick.cDoc 'Número do Pedido',
 (SELECT TOP 1 observacao FROM tbl_Fila WHERE idDado = tick.idTickets and etapaSolution like '%CriarPedidoCompra' order by horaFim desc) as 'Observação',
 tick.statusProtheus as 'Status do Pedido',
 (SELECT max(horaFim) FROM tbl_Fila WHERE idDado = tick.idTickets and etapaSolution like '%VerificarStatus') as 'Data de consulta do status',
 (SELECT TOP 1 observacao FROM tbl_Fila WHERE idDado = tick.idTickets and etapaSolution like '%RetornoTmMaster' order by horaFim desc) as 'Status TMMaster'
FROM tbl_PA001_Tickets as tick
INNER JOIN tbl_Fila as fila ON fila.idDado = tick.idTickets
WHERE  (fila.etapaSolution like '%VerificarStatus' and fila.status = 'Pendente')
or (fila.etapaSolution like '%VerificarStatus' and fila.status = 'Sucesso' and tick.statusProtheus = 'Rejeitado' and fila.horaFim > GETDATE() - 2)
or (fila.etapaSolution like '%VerificarStatus' and fila.status = 'Sucesso' and tick.statusProtheus = 'Prazo_Ultrapasado' and fila.horaFim > GETDATE() - 2)
or (fila.etapaSolution like '%RetornoTmMaster' and fila.status = 'Pendente')
or (fila.etapaSolution like '%RetornoTmMaster' and fila.status <> 'Pendente' and fila.horaFim > GETDATE() - 2 )