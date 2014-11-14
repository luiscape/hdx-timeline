# plot
library(ggplot2)

sub <- x[x$timestamp > as.POSIXct('2014-09-30'), ]

ggplot(x) + theme_bw() + 
  geom_bar(aes(timestamp, fill = activity_type), stat = 'bin')
