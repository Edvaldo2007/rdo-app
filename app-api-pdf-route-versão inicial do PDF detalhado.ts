import { NextResponse } from 'next/server';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 10, fontFamily: 'Helvetica' },
  h1: { fontSize: 16, marginBottom: 6, fontWeight: 700 },
  h2: { fontSize: 12, marginTop: 10, marginBottom: 4, fontWeight: 700 },
  table: { display: 'table', width: 'auto', marginTop: 6 },
  row: { flexDirection: 'row' },
  cellH: { padding: 4, border: 1, fontWeight: 700, backgroundColor: '#eee' },
  cell: { padding: 4, border: 1 }
});

function RdoDoc({ rdo }: any) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.h1}>Relatório Diário de Obra (RDO)</Text>

        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={[styles.cellH,{width:120}]}>Obra</Text>
            <Text style={[styles.cell,{width:420}]}>{rdo.obra?.nome || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cellH,{width:120}]}>Data</Text>
            <Text style={[styles.cell,{width:420}]}>{rdo.data || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cellH,{width:120}]}>Relatório nº</Text>
            <Text style={[styles.cell,{width:420}]}>{rdo.numero ?? '-'}</Text>
          </View>
        </View>

        <Text style={styles.h2}>Condição & Clima</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={[styles.cellH,{width:80}]}>Manhã</Text>
            <Text style={[styles.cell,{width:140}]}>{rdo.clima?.manha || '-'}</Text>
            <Text style={[styles.cellH,{width:80}]}>Tarde</Text>
            <Text style={[styles.cell,{width:140}]}>{rdo.clima?.tarde || '-'}</Text>
            <Text style={[styles.cellH,{width:80}]}>Noite</Text>
            <Text style={[styles.cell,{width:140}]}>{rdo.clima?.noite || '-'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.cellH,{width:120}]}>Condição</Text>
            <Text style={[styles.cell,{width:420}]}>{rdo.condicao || '-'}</Text>
          </View>
        </View>

        <Text style={styles.h2}>Mão de obra</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={[styles.cellH,{width:320}]}>Função</Text>
            <Text style={[styles.cellH,{width:80}]}>Qtd</Text>
          </View>
          {(rdo.maoDeObra||[]).map((m:any, i:number)=>(
            <View key={i} style={styles.row}>
              <Text style={[styles.cell,{width:320}]}>{m.funcao}</Text>
              <Text style={[styles.cell,{width:80}]}>{m.qtd}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.h2}>Equipamentos</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={[styles.cellH,{width:320}]}>Nome</Text>
            <Text style={[styles.cellH,{width:80}]}>Qtd</Text>
          </View>
          {(rdo.equipamentos||[]).map((e:any, i:number)=>(
            <View key={i} style={styles.row}>
              <Text style={[styles.cell,{width:320}]}>{e.nome}</Text>
              <Text style={[styles.cell,{width:80}]}>{e.qtd}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.h2}>Atividades</Text>
        {(rdo.atividades||[]).map((a:string, i:number)=>(
          <Text key={i}>{`${i+1}. ${a}`}</Text>
        ))}
      </Page>
    </Document>
  );
}

export async function POST(req: Request) {
  const rdo = await req.json();
  const buf = await pdf(<RdoDoc rdo={rdo}/>).toBuffer();
  return new NextResponse(buf, { headers: { 'Content-Type': 'application/pdf' }});
}