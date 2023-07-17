PREFIX r: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX s: <./shared.ttl#>
PREFIX : <#>

INSERT DATA {
  GRAPH <> {

    :2022-3-11
      r:type :H-Ekz ;
      s:t "`lim_{x->0}({1+e^x}/2)^{cotx}=`___." .
    
    :2022-3-12
      r:type :H-Ekz ;
      s:t "`int_0^2{2x-4}/{x^2+2x+4}dx=`___." .
    
    :2022-3-13
      r:type :H-Ekz ;
      s:t "已知函数`f(x)=e^{sinx}+e^{-sinx}`，则`f^‴(2pi)=`___." .
    
    :2022-3-15
      r:type :H-Ekz ;
      s:t "已知`bbA`为`3`阶矩阵，交换`bbA`的第`2`行和第`3`行，再将第`2`列的`-1`倍加到第`1`列，得到矩阵`[[-2,1,-1],[1,-1,0],[-1,0,0]]`，则`bbA^{-1}`的迹`tr(bbA^{-1})=`___." .

  }
} ;

INSERT DATA {
  GRAPH <> {
    
    :2010-3-1
      r:type :H-Ekz ;
      s:t "若`lim_{x->0}[1/x-(1/x-a)e^x]=1`，则`a`等于___" ;
      s:A "0" ;
      s:B "1" ;
      s:C "2" ;
      s:D "3" .
    
    :2010-3-2
      s:t "设`y_1，y_2`是一阶线性非齐次方程`y'+p(x)y=q(x)`的两个特解，若常数`lambda`，`mu`使`lambday_1+muy_2`是该方程的解，`lambday_1-muy_2`是该方程对应的齐次方程的解，则___" ;
      s:A "`lambda=1/2,mu=1/2`" ;
      s:B "`lambda=-1/2,mu=-1/2`" ;
      s:C "`lambda=2/3,mu=1/3`" ;
      s:D "`lambda=2/3,mu=2/3`" .
    
    :2010-3-3
      s:t "设函数`f(x),g(x)`具有二阶导数，且`g″`" .

  }
} ;
